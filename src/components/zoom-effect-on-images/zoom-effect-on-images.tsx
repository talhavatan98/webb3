import Image from 'next/image';

export default function ZoomEffectOnImages() {
  return (
    <div className="zoom-container">
      <Image 
        src="/homm1.jpg" 
        alt="Zoomed image" 
        width={500} 
        height={300} 
        className="zoom-effect"
      />
    </div>
  );
}
