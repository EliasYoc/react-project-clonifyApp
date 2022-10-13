import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIncomingElement } from "../../../features/themesSlice";
import { useElementPosition } from "../../../hooks/useElementPosition";
import "./UpperDetailsSkeleton.css";
const UpperDetailsSkeleton = ({ hasImg = false, hasType = false }) => {
  const dispatch = useDispatch();
  // const refIncomingElement = useRef();
  const { refElement, getPosition } = useElementPosition();
  useEffect(() => {
    if (hasImg) {
      const incomingElement = getPosition();
      dispatch(setIncomingElement(incomingElement));
    }
  }, [hasImg, dispatch, getPosition]);
  return (
    <section className="details skeletonUpper">
      <div className="details__blur"></div>
      <div className="details__wrap-info">
        {hasImg && (
          <div
            ref={refElement}
            className="details__wrap-img skeletonUpper__img"
          ></div>
        )}
        <div className="details__info skeletonUpper__info">
          {hasType && (
            <span className="details__type skeletonUpper__type">.</span>
          )}
          <span className="details__title skeletonUpper__title">
            .<br />.
          </span>

          <p className="details__aditional skeletonUpper__aditional">.</p>
        </div>
      </div>
    </section>
  );
};

export default UpperDetailsSkeleton;
