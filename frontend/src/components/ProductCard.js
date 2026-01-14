import { Link } from "react-router-dom";
import { getImage } from "../utils/getImage";

export default function ProductCard({ product }) {
  const imageUrl = getImage(product.images?.[0]);

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={imageUrl}
          alt={product.name}
          style={{ height: "170px", objectFit: "contain" }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>

          {/* ⭐ STAR RATING (ADD THIS BLOCK) */}
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                }}
              ></div>
            </div>

            <span id="no_of_reviews">
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          {/* PRICE */}
          <p className="card-text">₹{product.price}</p>

          <Link
            to={`/product/${product._id}`}
            className="btn btn-block"
            id="view_btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
