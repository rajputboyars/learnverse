import crypto from 'crypto';
import Certificate from '@/models/Certificate';

function makeCertId(courseSlug) {
  const abbrev = courseSlug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'CRS';
  const hash = crypto.randomBytes(4).toString('hex').slice(0, 5).toUpperCase();
  return `LV-${abbrev}-${hash}`;
}

// Idempotent: returns the existing certificate for (userId, course) or
// issues a new one. Called the moment a completed course is viewed.
export async function getOrCreateCertificate({ userId, userName, course, totalConcepts, completedAt }) {
  let cert = await Certificate.findOne({ userId, courseId: course._id }).lean();
  if (cert) return cert;

  let certId = makeCertId(course.slug);
  // Vanishingly unlikely, but certId must be globally unique.
  for (let i = 0; i < 3 && (await Certificate.exists({ certId })); i++) {
    certId = makeCertId(course.slug);
  }

  try {
    cert = await Certificate.create({
      userId,
      courseId: course._id,
      certId,
      userName,
      courseTitle: course.title,
      courseSlug: course.slug,
      courseIcon: course.icon,
      totalConcepts,
      completedAt,
    });
    return cert.toObject();
  } catch (err) {
    // Race: another request created it first (unique userId+courseId index).
    if (err.code === 11000) {
      cert = await Certificate.findOne({ userId, courseId: course._id }).lean();
      if (cert) return cert;
    }
    throw err;
  }
}
