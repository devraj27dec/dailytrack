import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NotFound from "./pages/NotFound"
import Hero from "./pages/Hero"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./providers/AuthProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Profile from "./pages/Profile"
import { ThemeProvider } from "./providers/ThemeProvider"

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
              <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/dashboard" element={<ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute> 
                  <Profile/>
                </ProtectedRoute>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
  )
}

export default App
