const {
  DropDownMenu,
  MenuItem,
  TextField,
  FlatButton,
  Dialog,
  Paper
} = MUI;

const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;

PublicProject = React.createClass({
  mixins: [ReactMeteorData,ReactRouter.History],
  getInitialState(){
    return {
      category: "电商",
      sort: '创新创业',
      team: undefined
    }
  },
  getMeteorData(){
    let id = Meteor.userId();
    Meteor.subscribe('checkTeam', id);
    let isCaptain = Collections.Team.find({captain: id}).fetch();
    return {
      team: isCaptain
    }
  },
  componentDidMount() {
    var textbox = ReactDOM.findDOMNode(this.refs.textarea);
    this.editor = new Simditor({
      textarea: $(textbox),
      placeholder: '这里输入内容...',
      toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
        'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'indent', 'outdent', 'alignment', 'hr'],
      // upload: {
      //  url: 'testUpload', //文件上传的接口地址
      //  params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
      //  fileKey: 'fileDataFileName', //服务器端获取文件数据的参数名
      //  connectionCount: 3,
      //  leaveConfirm: '正在上传文件'
      // }
    });
    
  },
  testUpload(value){
    console.log(value);
  },
  gotoCreateTeam() {
    this.history.pushState(null, `/user/team/${Meteor.userId()}`);
  },
  checkTeam(){
    return this.data.team.length !== 0 ? true : false;
  },
  selectTeam(value){
    this.setState({
      team:value
    })
  },
  // TODO:调整样式，间距和颜色，还有添加成员按钮
  render(){
    const styles = {
      wrap: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center',
        margin: '10rem'
      },
      form: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center'
      },
      paper:{
        width: '14rem',
        height: '12rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        fontSize: '12px',
        alignItems: 'center',
        marginBottom: '3rem'
      },
      buttongroup: {
        display: 'flex',
        width: '15rem',
        justifyContent: 'space-between',
        margin: '2rem'
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };
    let imagePreview = null;
    if (this.state.imagePreviewUrl) {
      imagePreview = (<img src={this.state.imagePreviewUrl} />);
    }
    let actions = [
      <FlatButton
        label="创建团队"
        primary={true}
        onTouchTap={this.gotoCreateTeam}/>,
    ];
    return (
      <div style={styles.wrap}>
        {this.checkTeam() ? '' :
          <Dialog
            title="团队检测"
            actions={actions}
            modal={true}
            open>
            由于您还没有团队，所以得先创建团队。
          </Dialog>
        }
        <form style={styles.form} onSubmit={this.onSubmit}>
          <TextField
            ref="name"
            floatingLabelText="项目名称"/>
          <DropDownMenu value={this.state.sort} rer="sort" onChange={this.sortHandleChange}>
            <MenuItem value={"创新创业"} primaryText="创新创业"/>
            <MenuItem value={"学科竞赛"} primaryText="学科竞赛"/>
            <MenuItem value={"课程项目"} primaryText="课程项目"/>
          </DropDownMenu>
          <DropDownMenu value={this.state.category} rer="category" onChange={this.handleChange}>
            <MenuItem value={"电商"} primaryText="电商"/>
            <MenuItem value={"O2O"} primaryText="O2O"/>
            <MenuItem value={"互联网金融"} primaryText="互联网金融"/>
            <MenuItem value={"企业服务"} primaryText="企业服务"/>
            <MenuItem value={"汽车服务"} primaryText="汽车服务"/>
            <MenuItem value={"医疗健康"} primaryText="医疗健康"/>
            <MenuItem value={"社交"} primaryText="社交"/>
            <MenuItem value={"在线教育"} primaryText="在线教育"/>
            <MenuItem value={"房产服务"} primaryText="房产服务"/>
            <MenuItem value={"在线旅游"} primaryText="在线旅游"/>
            <MenuItem value={"硬件"} primaryText="硬件"/>
            <MenuItem value={"游戏"} primaryText="游戏"/>
            <MenuItem value={"广告营销"} primaryText="广告营销"/>
            <MenuItem value={"文化体育娱乐"} primaryText="文化体育娱乐"/>
          </DropDownMenu>
          <TextField
            style={{margin:'2rem'}}
            ref="brief"
            hintText="请控制在30字以内"
            onChange={this.checkTextLength}
            floatingLabelText="项目简述"/>
          <textarea ref='textarea' rows="50"/>
        </form>
        {
          this.data.team.length < 1 ? '' : <SelectTeam items={this.data.team} selectTeam={this.selectTeam}/>
        }
        {
          this.state.team === undefined ? '' :
            <Paper style={styles.paper} zDepth={this.state.zDepth}>
              <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.state.team.name}</h1>
              <p style={{margin: '0',color: '#525457'}}>{'团队人数' + this.state.team.member}</p>
            </Paper>
        }
        <div>
          <FlatButton
            label="取消"
            onTouchTap={this.onCancel}/>
          <FlatButton
            label="确认"
            primary={true}
            type="submit"
            keyboardFocused={true}
            onTouchTap={this.onSubmit}/>
        </div>
      </div>
    );
  },
  deleteImage(){
    Collections.ProjectImages.remove({_id:'b3EdGps9QtxXAMcdf'},function(err,result){
      if(!err){
        console.log("Remove success");
      }
    });
  },
  checkTextLength(event){
    if (event.target.value.length > 30) {
      alert("简述字数超过限制！")
    }
  },
  handleChange(e, index, value){
    this.setState({category: value})
  },
  sortHandleChange(e, index, value){
    this.setState({sort: value})
  },
  // TODO:onCancel function has not created
  onSubmit(){
    let projectinfo = {};
    projectinfo.authorId = Meteor.userId();
    projectinfo.name = this.refs.name.getValue();
    projectinfo.category = this.state.category;
    projectinfo.team = this.state.team.id;
    projectinfo.state = 'closed';
    // TODO:sort做成下拉菜单
    projectinfo.sort = this.state.sort;
    projectinfo.department = Meteor.user().profile.department;
    projectinfo.brief = this.refs.brief.getValue();
    projectinfo.description = this.refs.textarea.value;
    projectinfo.createdAt = new Date();
    Collections.Projects.insert(projectinfo, (error) => {
      if (error) {
        alert(error);
      }
      this.props.history.replaceState(null, '/user');
    });

  }
});
