import AppRoutes from "./routes/AppRoutes";


import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import ChatProvider from "./context/ChatContext";
import NoteProvider from "./context/NoteContext";
import TaskProvider from "./context/TaskContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <NoteProvider>
            <TaskProvider>
              <AppRoutes />
            </TaskProvider>
          </NoteProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;