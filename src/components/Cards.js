import React from "react";

export default function Cards({ podcasts }) {
  function formatDate(date) {
    let [d, h] = date.split("T");
    d = d.split("-").reverse().join("/");
    let [hour] = h.split("-");
    let [hr, mi] = hour.split(":");
    return `Publicado em: ${d} ${hr}:${mi}`;
  }

  function createMarkup(html) {
    return { __html: html };
  }

  return (
    <div className="container">
      <div className="row">
        {podcasts.map((podcast) => (
          <div className="col-md-4" key={podcast.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={podcast.image}
                alt="banner"
                title="banner"
                className="img-fluid rounded"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {podcast.id} - {podcast.title}
                </h5>
                <p className="text-muted">
                  {formatDate(podcast.published_at)} -{" "}
                  {podcast.friendly_post_time}
                </p>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={createMarkup(podcast.description)}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <audio className="audio" controls>
                    <source src={podcast.audio_high} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
