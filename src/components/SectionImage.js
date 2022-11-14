import React from "react";

const SectionImage = ({data}) => {
    return (
          <div style={{display: "grid",gridTemplateColumns: "auto auto auto",padding: "10px"}}>
            {data?.map((ele) => {
              return (
                <div className="card">
                    <img className="card-img-top" src={ele?.url} alt={ele?.title} />
                </div>
              )
            })}
          </div>
    )
}

export default SectionImage;