"use client";

export default function ExternalVideo({
    onEnded,
    videoRef
}: {
    onEnded: (e: any) => void;
    videoRef: any
}) {

  return (
    <>
      <video
      id="video"
      ref={videoRef as any}
      controls onEnded={onEnded}
      preload='auto'
      >
        <source src="/dance.2.mp4" type="video/mp4"/>
      </video>
    </>
  );
}

