import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
        
        if (response.data) {
          setItem(response.data);
          setError(null);
        } else {
          setError("No data received from API");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to load item details");
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    } else {
      setError("No item ID provided");
      setLoading(false);
    }
  }, [id]);

  const SkeletonLoader = () => (
    <div className="row">
      <div className="col-md-6 text-center">
        <Skeleton 
          width="100%" 
          height="400px" 
          borderRadius="8px" 
        />
      </div>
      <div className="col-md-6">
        <div style={{ padding: "20px" }}>
          <Skeleton width="200px" height="32px" borderRadius="4px" />
          <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
            <Skeleton width="60px" height="24px" borderRadius="12px" />
            <Skeleton width="60px" height="24px" borderRadius="12px" />
          </div>
          <div style={{ marginTop: "16px" }}>
            <Skeleton width="100%" height="80px" borderRadius="4px" />
          </div>
          <div style={{ marginTop: "24px" }}>
            <Skeleton width="60px" height="16px" borderRadius="4px" />
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width="40px" height="40px" borderRadius="50%" />
              <Skeleton width="120px" height="16px" borderRadius="4px" />
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Skeleton width="60px" height="16px" borderRadius="4px" />
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width="40px" height="40px" borderRadius="50%" />
              <Skeleton width="120px" height="16px" borderRadius="4px" />
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <Skeleton width="60px" height="16px" borderRadius="4px" />
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width="24px" height="24px" borderRadius="4px" />
              <Skeleton width="80px" height="24px" borderRadius="4px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <SkeletonLoader />
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="text-center" style={{ padding: "40px 0" }}>
                <div style={{ 
                  background: "#f8f9fa", 
                  padding: "20px", 
                  borderRadius: "8px",
                  border: "1px solid #e9ecef"
                }}>
                  <i className="fa fa-exclamation-triangle" style={{ fontSize: "48px", color: "#6c757d", marginBottom: "16px" }}></i>
                  <h4 style={{ color: "#6c757d", marginBottom: "8px" }}>Item Not Found</h4>
                  <p style={{ color: "#6c757d", marginBottom: "16px" }}>{error}</p>
                  <Link to="/" style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-block"
                  }}>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item?.title || "NFT Item"}
                  onError={(e) => {
                    e.target.src = nftImage;
                  }}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item?.title || "NFT Item"}{item?.tag ? ` #${item.tag}` : ""}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes || 0}
                    </div>
                  </div>
                  <p>
                    {item?.description || "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.ownerId || 'default'}`}>
                            <img 
                              className="lazy" 
                              src={item?.ownerImage || AuthorImage} 
                              alt={item?.ownerName || "Owner"}
                              onError={(e) => {
                                e.target.src = AuthorImage;
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.ownerId || 'default'}`}>
                            {item?.ownerName || "Owner Name"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.creatorId || item?.ownerId || 'default'}`}>
                            <img 
                              className="lazy" 
                              src={item?.creatorImage || item?.ownerImage || AuthorImage} 
                              alt={item?.creatorName || item?.ownerName || "Creator"}
                              onError={(e) => {
                                e.target.src = AuthorImage;
                              }}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId || item?.ownerId || 'default'}`}>
                            {item?.creatorName || item?.ownerName || "Creator Name"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price || "0.00"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
