'use client';

import { useEffect, useState } from 'react';
import { Icon } from './icons';

/** Progressive enhancement only: content and links work without motion or JS. */
export function PageExperience() {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-entered');
        if (!reducedMotion.matches && 'animate' in entry.target) {
          const animation = entry.target.animate(
            [{ opacity: .45, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)' },
          );
          animations.add(animation);
          animation.finished.finally(() => animations.delete(animation)).catch(() => {});
        }
        reveal.unobserve(entry.target);
      }
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .service, .project-card, .examples, .music-case, .method-steps li, .innure-layout').forEach((element) => reveal.observe(element));

    const cancelMotion = () => {
      if (reducedMotion.matches) animations.forEach((animation) => animation.cancel());
    };
    reducedMotion.addEventListener('change', cancelMotion);

    const hero = document.getElementById('inicio');
    const contact = document.getElementById('contacto');
    const footer = document.querySelector('footer');
    let contactOnScreen = false;
    let footerOnScreen = false;
    const contactVisibility = new IntersectionObserver((entries) => {
      if (!hero || !contact || !footer) return;
      for (const entry of entries) {
        if (entry.target === contact) contactOnScreen = entry.isIntersecting;
        if (entry.target === footer) footerOnScreen = entry.isIntersecting;
      }
      setShowContact(hero.getBoundingClientRect().bottom <= 0 && !contactOnScreen && !footerOnScreen);
    });
    [hero, contact, footer].forEach((element) => { if (element) contactVisibility.observe(element); });

    return () => {
      reveal.disconnect();
      contactVisibility.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener('change', cancelMotion);
    };
  }, []);

  return <aside className="quick-contact" hidden={!showContact} aria-label="Hablar con Innure"><span>¿Lo vemos en tu negocio?</span><a className="button button-small" href="#contacto">Hablemos <Icon name="arrow" /></a></aside>;
}
