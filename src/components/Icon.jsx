'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brandColor, resolveIcon } from '@/lib/icons';

/**
 * Single entry point for every icon in the app.
 *
 *   <Icon name="fire" />                     semantic name (preferred)
 *   <Icon name={course.icon} />              legacy emoji stored in the DB
 *   <Icon name="rocket" className="text-lg" />
 *   <Icon name={course.icon} brand />        tint with the technology's own colour
 *
 * `name` is always a plain string, so this stays safe to render from server
 * components. Unknown names fall back to the raw glyph rather than vanishing.
 *
 * `brand` is opt-in: use it wherever the icon stands for a technology (course
 * cards, roadmap steps) so JS reads yellow, Docker blue, Node green. Elsewhere
 * icons stay on the theme colour so the UI does not turn into confetti.
 *
 * Both variants of the brand colour ride along as inline custom properties and
 * the .brand-icon rules in globals.css pick one, so the same markup switches
 * with the theme (a single inline colour could not). Names without a brand
 * colour are left alone and keep whatever the className sets.
 */
export default function Icon({ name, className = '', label, spin = false, brand = false, style, ...rest }) {
  const icon = resolveIcon(name);
  const colors = brand ? brandColor(name) : null;

  const iconClass = colors ? `${className} brand-icon`.trim() : className;
  const iconStyle = colors
    ? { ...style, '--brand-light': colors.light, '--brand-dark': colors.dark }
    : style;

  const a11y = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': 'true' };

  if (!icon) {
    return (
      <span className={iconClass} style={iconStyle} {...a11y} {...rest}>
        {name}
      </span>
    );
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      spin={spin}
      className={iconClass}
      style={iconStyle}
      {...a11y}
      {...rest}
    />
  );
}
