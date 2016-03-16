const { Styles, CircularProgress } = MUI;

Project = React.createClass({
  mixins:[ReactMeteorData],

  getInitialState(){
    return {
      posts: [],
      inputText:''
    };
  },

  getMeteorData(){
    Meteor.subscribe('projects');
    let projects = Collections.Projects.find().fetch();
    return {
      projects:projects
    };
  },

  componentDidMount(){
    $(".loader").delay(600).fadeOut('slow',function(){
      $(".blog-list").fadeIn('slow');
    })
  },

  render() {
    let styles={
      root:{
        paddingTop:'64px',
        backgroundColor:'#fafafa',
        minHeight:'50em'
      },
      hero:{
        backgroundColor:'#03A9F4',
        textAlign:'center',
        paddingTop:'55px',
        paddingBottom:'55px',
        marginBottom:'30px'
      },
      title:{
        fontSize:'48px',
        color:'#fff',
        marginBottom:'20px',
        lineHeight:1.1
      },
      circle:{
        margin:'0 auto',
        paddingTop:'100px',
        display:'block'
      }
    };

    return (
      <div style={styles.root}>
        <div style={styles.hero}>
          <div style={styles.title}>项目都在这里</div>
          <SearchBar
            inputText={this.state.inputText}
            onUserInput={this._handleInputChange} />
        </div>
        <CircularProgress
          mode='indeterminate'
          className='loader'
          style={styles.circle}/>
        <ProjectList 
          className='blog-list'
          inputText={this.state.inputText}
          projects={this.data.projects} />
      </div>
    );
  },
  _handleInputChange(text){
    this.setState({inputText:text})
  }
});