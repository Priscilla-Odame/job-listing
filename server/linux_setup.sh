#install virtual environment
echo "creating virtual environment..."
sudo apt install python3-venv -y
python3 -m venv venv

#install pip if it does not exist
echo "installing pip..."
sudo apt-get install python3-pip -y

#activate virtual env
echo "Activating virtual environment..."
source venv/bin/activate

#install requirements for project
"Installing requirements..."
pip install -r requirements.txt

#run the server
echo "Running the server in the background..."
flask --app api run