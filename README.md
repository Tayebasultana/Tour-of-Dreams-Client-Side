# TOUR OF DREAMS

## Project Overview

The **TOUR OF DREAMS** site is an online platform for travelers, offering comprehensive information on popular destinations in Bangladesh. It aims to help tourists plan their trips by providing detailed descriptions of tourist attractions, local culture, cuisine, and activities. The site features several user-centric functionalities, including tour bookings, profile management, and tour guide selection.

Whether you're a tourist looking for your next adventure, a tour guide eager to share your expertise, or an admin managing the system, **Tourist Guide** has something for everyone.

## Key Features

- **Authentication System:**
  - Users can register, login, and logout.
  - Users can log in with Google.
  - JWT authentication with token storage in LocalStorage.
  
- **User Roles:**
  - **Normal User/Tourist**: View and book tours, manage profiles, and add stories.
  - **Tour Guide**: Manage assigned tours, create/manage stories, and edit profiles.
  - **Admin**: Add and manage packages, users, tour guides, and stories.

- **HomePage Features:**
  - Banner/Slider Section
  - Tourism and Travel Guide Section (Our Packages and Meet Our Tour Guides tabs)
  - Tourist Story Section
  - Search functionality for random packages

- **Package Details Page:**
  - Tour gallery and itinerary information
  - List of assigned tour guides
  - Booking form with booking status

- **Community Page:**
  - View all stories added by users
  - Share stories using react-share

- **Responsive Design:**
  - Fully responsive across mobile, tablet, and desktop.
  - Dashboard pages for tourists, tour guides, and admins are also responsive.

- **Admin Dashboard:**
  - Manage users, candidates, and stories.
  - View stats like total payments, total clients, total tour guides, and total packages.

- **Tour Guide Dashboard:**
  - Manage assigned tours, accept/reject bookings, and manage stories.

- **Tourist Dashboard:**
  - Manage profile, bookings, stories, and apply to become a tour guide.


## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - React Router
  - React-DatePicker
  - React-Toastify for sweet alerts/notifications
  - React Query (TanStack Query) for data fetching
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication
  
- **Other Libraries/Tools**:
  - React Confetti (for congratulations animation after 3 bookings)
  - Framer Motion for animations
  - react-share (for sharing stories on social media)

## Live Site URL

[TOUR OF DREAMS - Live Demo](https://tour-of-dreams.web.app)

## Features of the Website

1. User-friendly interface for tourists and tour guides.
2. Dynamic, real-time content for packages and tour guides.
3. Ability for users to book tours and manage their bookings.
4. Tour guides can manage their assigned tours and profile.
5. Admin dashboard for managing all aspects of the platform.
6. Real-time notifications and sweet alerts for user interactions.
7. Profile management with the ability to upload images.
8. Secure authentication using JWT and Google login.
9. Integrated story-sharing feature with social media sharing options.
10. Payment integration (Stripe) for booking confirmation.

---

# Follow these steps to run the project locally on your machine:
1. **Clone or Download the Project**:  
   - You either clone the repository using `git clone` or download the ZIP file and extract it.
   
2. **Install Node.js**:  
   - If the project uses **Node.js**, this step ensures you have Node.js installed on your local system. It's important for running JavaScript code outside the browser.

3. **Install Project Dependencies**:  
   - This step installs all necessary libraries or dependencies the project requires, which are listed in `package.json`.

4. **Run the Project**:  
   - This is the step where you start the application. Once you run the `npm run dev` command, the application will start a local development server.

You can also modify the guide based on your project's specific needs, such as changing commands or adding more setup steps if required.

### Special Notes:

- The website is designed to be **mobile-friendly** and responsive for all devices (mobile, tablet, desktop).
- **JWT Authentication** ensures secure login and protected routes.
- The system utilizes **TanStack Query** for efficient and optimized data fetching.

---

Enjoy building and exploring the **TOUR OF DREAMS** platform! 😊
