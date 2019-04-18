import React, { useState, useEffect } from "react";
import axios from "axios";

const PullRequest = (props) => {
  const [data, setData] = useState({ githubRepo: [] });

  axios
    .get(
      "https://api.github.com/repos/" + props.user + "/" + props.repo + "/pulls"
    )
    .then((repo) => {
      console.log("repo", repo);
      this.setData({ githubRepo: repo.data });
    });
  return (
    <div>
      {data.githubRepo.map((name, index) => (
        <div key={index}>
          <p>{name.url}</p>
        </div>
      ))}
    </div>
  );
};

export default PullRequest;
