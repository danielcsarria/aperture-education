import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';

import './assets/scss/styles.scss';


const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<ThemeProvider theme={theme} >
			<div className='App'>
				<Navigation />
				<Dashboard />
			</div>
		</ThemeProvider>
		
	);
}

export default App;
