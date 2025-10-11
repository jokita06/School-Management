# 🏫 School Management System

A comprehensive school management platform built with Django and React, designed to streamline administrative operations and enhance educational organization in a fictional school environment.

## Project Overview

This full-stack application provides distinct interfaces for managers and teachers, offering tailored functionalities for each rol. The system efficiently handles employeers management, courses, classroom, and classroom reservation.
## Main Features

### Teacher Portal
- **Subject Access**: View assigned courses linked to their profile.
- **Room Reservations**: Book classroom and view their own class reservations.

### Manager Dashboard
- **Complete CRUD Operations**: Manage employees, courses, classroom, and class reservations.


## Technologies Used

<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" title="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" title="CSS3"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" width="40" title="Django"/>
</div>

## ⚙️ How to Run the Project

```bash
# Clone the repository
git clone https://github.com/jokita06/SmartCity.git

# Access the project folder
cd smart-city-sensor-monitor

# Install frontend dependencies
cd client
npm install

## Start React server
npm run dev

# In another terminal, access the backend
cd server

## Create a virtual environment
python -m venv env

## Activate the virtual environment
env\Scripts\activate

## Install dependencies
pip install -r requirements.txt

## Run migrations
python manage.py migrate

# Start Django server
python manage.py runserver
