import React from "react";

const SectionImage = ({data}) => {
    return (
          <div style={{display: "grid",gridTemplateColumns: "auto auto auto",padding: "10px"}}>
            {data?.map((ele) => {
              return (
                <div className="card">
                    <img className="imageClass" data-src={ele?.download_url} alt={ele?.author} src={'https://via.placeholder.com/600'} />
                </div>
              )
            })}
          </div>
    )
}

export default SectionImage;