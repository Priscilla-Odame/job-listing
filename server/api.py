from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import json
import os

UPLOAD_FOLDER = '../client/images'
ALLOWED_EXTENSIONS = {'svg', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

with open('../client/data.json') as f:
    data = json.load(f)

@app.route("/jobs")
def get_jobs():
    return _corsify_actual_response(jsonify(data))

@app.route("/jobs/<id>")
def get_job_by_id(id):
    index = request.view_args["id"]
    [final_data] = [i for i in data if i["id"] == int(index)]
    return final_data


@app.route("/jobs", methods=['POST'])
def add_job():
    prev_id = data[-1]["id"]
    next_id = int(prev_id) + 1
    json_data = request.form
    f = request.files['logo']
    if f and allowed_file(f.filename):
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))

    languages = json_data['languages'].split(',')
    tools = json_data['tools'].split(',')
 
    new_data = {
        "id": next_id,
        "company": json_data["company"],
        "logo": f"{UPLOAD_FOLDER}/{f.filename}",
        "new": json_data["new"],
        "featured": json_data["featured"],
        "position": json_data["position"],
        "role": json_data["role"],
        "level": json_data["level"],
        "postedAt": json_data["postedAt"],
        "contract": json_data["contract"],
        "location": json_data["location"],
        "languages": languages,
        "tools": tools
    }

    data.append(new_data)
    with open('../client/data.json', "w") as f:
        json.dump(data, f, indent=4)
    return "Job added",201

@app.route("/jobs/<id>", methods=["PATCH"])
def update_job(id):
    index = request.view_args["id"]
    json_data = request.get_json()
    
    [final_data] = [i for i in data if i["id"] == int(index)]
    new_index = data.index(final_data)
    for a in list(json_data.keys()):
        final_data[a] = json_data[a]

    new_data = data[:new_index]+[final_data]+data[new_index+1:]
    with open('../client/data.json', "w") as f:
        json.dump(new_data, f, indent=4)

    return final_data

@app.route("/jobs/<id>", methods=["DELETE"])
def delete_job(id):
    index = request.view_args["id"]
    [final_data] = [i for i in data if i["id"] == int(index)]
    data.remove(final_data)

    with open('../client/data.json', "w") as f:
        json.dump(data, f, indent=4)

    return f"Data with id {index} was sucessfully deleted", 204

if __name__ == '__main__':  
    app.run(debug = True)  