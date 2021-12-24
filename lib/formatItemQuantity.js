import Link from "next/link";
import CheckMark from "../public/icons/check-solid.svg";
import TimesSolid from "../public/icons/times-solid.svg";

export const formatItemQuantity = (product, setquantityText) => {
  const quantityNumber = parseInt(product.quantity);
  if (quantityNumber > 5) {
    setquantityText(
      <React.Fragment>
        <CheckMark className="w-5 relative left-4" />
        <p className="whitespace-nowrap flex-grow">In stock</p>
      </React.Fragment>
    );
    return;
  }
  if (quantityNumber > 0 || quantityNumber <= 5) {
    setquantityText(
      <React.Fragment>
        <CheckMark className="w-5" />
        <p className="whitespace-nowrap flex-grow">{`${quantityNumber} left`}</p>
      </React.Fragment>
    );
  }
  if (quantityNumber == 0) {
    setquantityText(
      <React.Fragment>
        <TimesSolid className="w-5" />
        <Link to="/contact">Please contact us</Link>
        <p className="whitespace-nowrap flex-grow">Out of stock</p>
      </React.Fragment>
    );
  }
};
