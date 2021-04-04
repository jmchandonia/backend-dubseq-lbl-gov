
const Title = (props) => (
	<h1 style={{
		margin: '25px 0px 50px 0px',
		paddingBottom: "10px",
		borderBottom: 'solid 1px #bbbbbb'
	}}>
		<span style={{fontWeight: "300"}}>{props.title}</span>
		
		{' - '}
		<span style={{
			color: '#fa7f72',
			fontWeight: 400
		}}>
			{props.specific}
		</span>
	</h1>
)

export default Title;