#install and create virtual environment
pip install virtualenv
virtualenv venv

#activate virtual env
venv\Scripts\activate

#install requirements for project
pip install -r requirements.txt

#run the server
flask --app api run