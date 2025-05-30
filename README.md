# to_do_list-app

## Description
to_do_list-app is a task management web application that allows users to create, edit, delete, and manage tasks with priorities and due dates. Built with React for a responsive frontend and Django with Django REST Framework for a secure backend, it features user authentication with JWT tokens, a dynamic dashboard with expandable cards, and automatic token refreshing to maintain sessions.

## Features
- **User Authentication**: Login with JWT-based access and refresh tokens.
- **Task Management**: Add, edit, delete, and mark tasks as complete with High, Medium, or Low priority.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.
- **Dashboard**: Interactive dashboard with expandable task cards showing titles, due dates, and descriptions.
- **Token Refresh**: Automatically refreshes access tokens to avoid frequent logins.
- **Date Picker**: MUI DatePicker for setting task due dates.

## Tech Stack
- **Frontend**: React, Tailwind CSS, MUI (Material-UI), Axios
- **Backend**: Django, Django REST Framework, `rest_framework_simplejwt`, PostgreSQL
- **Context Management**: React Context API for user state

## Installation

### Prerequisites
- Node.js (v18+)
- Python (v3.11+)
- PostgreSQL
- npm or yarn

### Setup

#### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/sa1375/to_do_list-app.git
   cd to_do_list-app/backend

2. Create a virtual environment and activate it:
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

3.Install dependencies:
    pip install -r requirements.txt

4.Configure the database:
  * Create a .env file with your PostgreSQL credentials (e.g., DATABASE_URL=postgres://user:password@localhost:5432/to_do_list).
  * Run migrations:
    python manage.py migrate

5.Create a superuser:
    python manage.py createsuperuser

6.Run the server:
    python manage.py runserver


#### Frontend
1.Navigate to the frontend directory:
    cd ../frontend

2.Install dependencies:
    npm install 

3.Start the development server:
    npm run dev

#### Usage
1. Open your browser and navigate to http://localhost:3000.
2. Log in with a registered username and password (use the superuser or register via the app).
3. Use the dashboard to manage your tasks, including expanding cards for details.

#### Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure you:
  * Follow the existing code style (e.g., Tailwind CSS classes, Django conventions).
  * Write tests for new features.
  * Update the documentation as needed.

#### Acknowledgments
  * Built with inspiration from task management tools.
  * Thanks to the open-source communities of React, Django, Tailwind CSS, and MUI.

#### Contact
For questions or support, please open an issue on the GitHub repository.

#### Known Issues
  * Ensure .env is correctly configured with database credentials.
  * Token refresh might require manual testing for edge cases (e.g., refresh token expiry).
