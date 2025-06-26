class PostRow extends React.Component {
  render () {
    const post = this.props.post;
    const thumbnail = post.hero_image && post.hero_image.thumbnail
      ? <img src={post.hero_image.thumbnail} alt="Thumbnail"/>
      : '-';

    return (
      <tr>
        <td>{post.title}</td>
        <td>{thumbnail}</td>
        <td>{post.tags.join(', ')}</td>
        <td>{post.slug}</td>
        <td>{post.summary}</td>
        <td><a href={'/post/' + post.slug + '/'}>View</a></td>
      </tr>
    );
  }
}

class PostTable extends React.Component {
  handleHeaderClick = (field) => {
    this.props.onSort(field);
  }

  render () {
    const rows = this.props.posts.length
      ? this.props.posts.map(post => <PostRow key={post.id} post={post} />)
      : <tr><td colSpan="6">No results found.</td></tr>;

    return (
      <table className="table table-striped table-bordered mt-2">
        <thead>
          <tr>
            <th onClick={() => this.handleHeaderClick('title')} style={{ cursor: 'pointer' }}>Title</th>
            <th>Image</th>
            <th onClick={() => this.handleHeaderClick('tags')} style={{ cursor: 'pointer' }}>Tags</th>
            <th onClick={() => this.handleHeaderClick('slug')} style={{ cursor: 'pointer' }}>Slug</th>
            <th onClick={() => this.handleHeaderClick('summary')} style={{ cursor: 'pointer' }}>Summary</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class PaginationControls extends React.Component {
  render () {
    const { previous, next, onPageChange } = this.props;

    return (
      <div className="mt-2">
        {previous &&
          <button className="btn btn-secondary mr-2" onClick={() => onPageChange(previous)}>Previous</button>}
        {next &&
          <button className="btn btn-secondary" onClick={() => onPageChange(next)}>Next</button>}
      </div>
    );
  }
}

class PostTableWrapper extends React.Component {
  state = {
    dataLoaded: false,
    data: {
      results: [],
      next: null,
      previous: null
    },
    currentUrl: this.props.url
  }

  componentDidMount () {
    this.fetchData(this.state.currentUrl);
  }

  fetchData = (url) => {
    fetch(url).then(response => {
      if (response.status !== 200) {
        throw new Error('Invalid status from server: ' + response.statusText);
      }
      return response.json();
    }).then(data => {
      this.setState({
        dataLoaded: true,
        data: data,
        currentUrl: url
      });
    }).catch(e => {
      console.error(e);
      this.setState({
        dataLoaded: true,
        data: {
          results: [],
          next: null,
          previous: null
        }
      });
    });
  }

  handlePageChange = (url) => {
    this.fetchData(url);
  }

  handleSort = (field) => {
    const baseUrl = this.props.url.split('?')[0]; // strip query params if any
    const newUrl = `${baseUrl}?ordering=${field}`;
    this.fetchData(newUrl);
  }

  render () {
    const { data, dataLoaded } = this.state;

    if (!dataLoaded) {
      return <p>Loading&hellip;</p>;
    }

    return (
      <div>
        <PostTable
          posts={data.results}
          onSort={this.handleSort}
        />
        <PaginationControls
          previous={data.previous}
          next={data.next}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const domContainer = document.getElementById('react_root');
ReactDOM.render(
  React.createElement(PostTableWrapper, { url: postListUrl }),
  domContainer
);
