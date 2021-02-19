
const Title = (props) => (
	<h1 style={{
		margin: '25px 0px 50px 0px',
		borderBottom: 'solid 2px black'
	}}>
		{props.title}
		{' - '}
		<span style={{
			color: 'red',
			fontWeight: 300
		}}>
			{props.specific}
		</span>
	</h1>
)

export default Title;