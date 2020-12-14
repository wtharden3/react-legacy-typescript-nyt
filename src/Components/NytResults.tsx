const NytResults = (props: any) => {
  return (
    <div>
      
      <div>
        {props.pageNumber === 0 ? null : (
          <button
            style={{ padding: '5px 20px' }}
            onClick={e => props.changePage(e, 'down')}
          >
            See Previous 10 articles
          </button>
        )}
        <button
          style={{ padding: '5px 20px' }}
          onClick={e => props.changePage(e, 'up')}
        >
          See Next 10 articles
        </button>
      </div>
      <br />
      {props.results.map((result: any) => {
        return (
          <div key={result._id}>
            <h1
              style={{
                width: '80%',
                maxWidth: '800px',
                margin: '0 auto',
                paddingBottom: '10px',
                paddingTop: '20px',
              }}
            >
              {result.headline.main}
            </h1>
            <a
              style={{ marginBottom: '10px' }}
              href={result.web_url}
              target="_blank"
              rel="noreferrer"
            >
              <button style={{ padding: '5px 20px' }}>Read this article</button>
            </a>
            <br />
            <br />
            {result.multimedia.length > 1 ? (
              <img
                alt={result.headline.main}
                src={`http://www.nytimes.com/${result.multimedia[1].url}`}
                style={{ width: '80%', height: 'auto', maxWidth: '800px' }}
              />
            ) : (
              ''
            )}
            <p
              style={{
                fontWeight: 'bold',
                paddingBottom: '20px',
                paddingTop: '10px',
                fontSize: '20px',
                width: '80%',
                height: 'auto',
                maxWidth: '800px',
                textAlign: 'left',
                margin: '0 auto',
              }}
            >
              {result.snippet}
            <a style={{paddingLeft: '10px', fontStyle: 'italic'}} href={result.web_url} target="_blank" rel="noreferrer">
              Read more...
            </a>
              <br />
              {result.keywords.length > 0 ? <h3>Keywords:</h3> : ''}
            </p>
            <p
              style={{
                width: '80%',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '2',
              }}
            >
              {result.keywords.map((keyword: any) => (
                <span
                  style={{
                    fontStyle: 'italic',
                    display: 'inline-block',
                    paddingRight: '16px',
                  }}
                  key={keyword.value}
                >
                  {keyword.value}
                </span>
              ))}
            </p>
            <br />
            <br />
            <hr />
          </div>
        );
      })}
      <div>
        {props.pageNumber === 0 ? null : (
          <button
            style={{ padding: '5px 20px' }}
            onClick={e => props.changePage(e, 'down')}
          >
            See Previous 10 articles
          </button>
        )}
        <button
          style={{ padding: '5px 20px' }}
          onClick={e => props.changePage(e, 'up')}
        >
          See Next 10 articles
        </button>
      </div>

    </div>
  );
};

export default NytResults;
