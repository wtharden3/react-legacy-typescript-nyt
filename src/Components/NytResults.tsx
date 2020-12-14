const NytResults = (props: any) => {
  return (
    <div>
      {props.results.map((article: any) => {
        let img_src;
        if (article.multimedia.length > 0) {
          img_src = `http://www.nytimes.com/${article.multimedia[0].url}`;
        }

        return (
          <div key={article._id}>
            <h1
              style={{
                width: '80%',
                maxWidth: '800px',
                margin: '0 auto',
                paddingBottom: '10px',
                paddingTop: '20px'
              }}
            >
              <a href={article.web_url}>{article.headline.main}</a>
            </h1>
            <img
              src={img_src}
              style={{ width: '80%', height: 'auto', maxWidth: '800px' }}
              alt={article.headline.main}
            />
            <p
              style={{
                fontWeight: 'bold',
                paddingBottom: '20px',
                paddingTop: '10px',
                fontSize: '28px',
                width: '80%',
                height: 'auto',
                maxWidth: '800px',
                textAlign: 'left',
                margin: '0 auto',
              }}
            >
              {article.snippet}
            </p>
            <p
              style={{
                width: '80%',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '2',
              }}
            >
              {article.keywords.map((keyword: any, index: number) => {
                return (
                  <span key={index}>
                    <span
                      style={{
                        fontStyle: 'italic',
                        display: 'inline-block',
                        paddingRight: '16px',
                      }}
                    >
                      {keyword.value}
                    </span>
                  </span>
                );
              })}
            </p>

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default NytResults;
