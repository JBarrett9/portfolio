import { useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import "./img-gallery.css";

const useOutsideClick = (ref, setDisplay, setEnabled) => {
  useEffect(() => {
    function handleClickOut(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
        if (setEnabled) {
          setEnabled(true);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [ref]);
};

const Gallery = (props) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.setDisplay, props.setEnabled);

  return (
    <div ref={wrapperRef} className="gallery">
      <a className="close-gallery" onClick={() => props.setDisplay(false)}>
        <Icon path={mdiClose} size={2.4} color="#FFFFFF" />
      </a>
      <ImageGallery items={props.images} showPlayButton={false} />
    </div>
  );
};

export default Gallery;
