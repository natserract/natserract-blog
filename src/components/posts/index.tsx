import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { PropsI } from "./types";
import { generateKey } from "../../utils";
import Link from "next/link";
import { useLoadingIndicator } from "~/src/hooks";
import format from "date-fns/format";

const useStyles = makeStyles(styles);
const parseDate = (date: number | Date) => format(date, "MMMM DD, YYYY");

const Posts: React.FC<PropsI> = ({ data }: PropsI) => {
  const classes = useStyles();

  const [loadingState, setLoadingState] = useState(false);
  const loadingIndicator = useLoadingIndicator(loadingState, setLoadingState);

  if (!data) {
    return <>Data must be set!</>;
  }

  return (
    <ul className={classes.postListsContainer}>
      {data &&
        data.map((item) => {
          const { title, excerpt, content, date, slug, disqus } = item;

          return (
            <li key={generateKey()} className={classes.posts}>
              <h3 className={`${classes.postsHeadContainer}`}>
                <div>
                  <Link href={`post/${slug}`}>
                    <a onClick={loadingIndicator}>{title}</a>
                  </Link>
                  {item?.favorite && item?.favorite === "yes" && (
                    <span className={classes.favoriteIcon}>✨</span>
                  )}
                </div>

                <div className={classes.metaInfo}>
                  <span className={`${classes.divider} hidden-xs`}>-</span>
                  <time className={classes.postDate}> {parseDate(date)}</time>
                  <span className={classes.divider}>-</span>
                  <span>
                    by <i>{item?.author}</i>
                  </span>
                </div>
              </h3>
            </li>
          );
        })}
    </ul>
  );
};

export default Posts;
