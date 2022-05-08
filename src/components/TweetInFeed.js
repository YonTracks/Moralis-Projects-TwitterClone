import './TweetInFeed.css';
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import React, { useEffect, useState } from "react";

const TweetInFeed = ({ profile }) => {

  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();
  
        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
 }, [Moralis.Object, Moralis.Query, account, profile]);
 return (
  <>
    {tweetArr?.map((e) => {
      return (
        <>
          <div className="feedTweet">
            <img alt="" src={e.attributes.tweeterPfp ? e.attributes.tweeterPfp : defaultImgs[0]} className="profilePic"></img>
            <div className="completeTweet">
              <div className="who">
              {e.attributes.tweeterUserName.slice(0, 9)}
                <div className="accWhen">{
                      `${e.attributes.tweeterAcc.slice(0, 4)}...${e.attributes.tweeterAcc.slice(38)} ·
                      ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })} 
                      ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                      ` 
                    }
                    </div>
              </div>
              <div className="tweetContent">
              {e.attributes.tweetTxt}
              {e.attributes.tweetImg && (
                      <img
                         alt="" src={e.attributes.tweetImg}
                        className="tweetImg"
                      ></img>
                    )}
              </div>
              <div className="interactions">
                <div className="interactionNums">
                  <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                </div>
                <div className="interactionNums">
                  <Icon fill="#3f3f3f" size={20} svg="star" />
                  12
                </div>
                <div className="interactionNums">
                  <Icon fill="#3f3f3f" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }).reverse()}
  </>
)
  }
export default TweetInFeed;
