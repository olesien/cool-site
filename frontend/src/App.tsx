import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { publicRoutes } from './routes'
import { AppProvider } from './contexts/appContext'



const App = () => {
    return (
        <AppProvider>
            <Main />
        </AppProvider>
    )
}

const Main = () => {
    const { defaultAlgorithm } = theme;

    return (
        <ConfigProvider
            theme={{
                // algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
                algorithm: defaultAlgorithm
            }}
        >
            <RouterProvider router={publicRoutes} />
        </ConfigProvider>
    )
}

export default App
