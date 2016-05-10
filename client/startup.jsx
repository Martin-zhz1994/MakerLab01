injectTapEventPlugin();
const {
	Router,
	Route,
	IndexRoute
} = ReactRouter;

const {
	createHistory
} = History;

const Routes = (
	// <Route path="/" component = {App}/>
	<Route path="/" component = {App}>
		<Route path="project" component={Project}/>
		<Route path ="/project/:postName" component={ProjectPost} />
		<Route path ="/team/:postName" component={TeamPost} />
		<Route path="home" component={Home}/>
		<Route path="login" component={Login}/>
		<Route path="user" component={User}/>
		<Route path="team" component={Team}/>
		<Route path="join" component={Join}/>
		<Route path="/user/project/:publish" component={PublicProject} />
		<Route path="/user/team/:create" component={CreateTeam} />
		<IndexRoute component = {Home}/>
	</Route>
);

Meteor.startup(function(){
	ReactDOM.render((
		<Router history = {createHistory()}>
			{Routes}
		</Router>
	),document.getElementById("container"));
});

