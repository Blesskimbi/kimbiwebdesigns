type LocationMapProps = {
  className?: string;
  heightClassName?: string;
};

/** Embedded Google Maps location for Bless Kimbi Web Developer. */
const LocationMap = ({ className = "", heightClassName = "h-[300px] md:h-[380px]" }: LocationMapProps) => (
  <div className={`rounded-2xl overflow-hidden border border-border shadow-pro ${className}`}>
    <iframe
      title="Bless Kimbi Web Developer location map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8104017.498108215!2d6.997918728014437!3d7.349428375172377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2bbd72378f7a550b%3A0xdddc2079f054ced9!2sBless%20Kimbi%20Web%20Developer!5e0!3m2!1sen!2scm!4v1785805791188!5m2!1sen!2scm"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      className={`w-full ${heightClassName}`}
    />
  </div>
);

export default LocationMap;
