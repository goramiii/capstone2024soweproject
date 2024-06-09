from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from DB_Handler import filter_by_category, filter_by_options, filter_each_menu_description

app = Flask(__name__, static_folder='public')
CORS(app)

@app.route('/menu/<category>', methods=['GET'])
def get_menu(category):
    try:
        menu_list = filter_by_category(category)
        return jsonify(menu_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/menu', methods=['GET'])
def get_all_menus():
    try:
        categories = ["McCafe", "McMorning", "burger", "desserts", "drinks", "sides"]
        menu_list = []
        for category in categories:
            menu_list.append({
                "type": category,
                "label": category,
                "image": f"{category.lower()}.png"
            })
        return jsonify(menu_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('public/assets', filename)

@app.route('/filter', methods=['GET'])
def filter_menu():
    try:
        category = request.args.get('category')
        greasiness = int(request.args.get('greasiness', 5))
        hardness = int(request.args.get('hardness', 5))
        spiciness = int(request.args.get('spiciness', 5))
        filtered_menus = filter_by_options(category, greasiness, hardness, spiciness)
        return jsonify(filtered_menus), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/description/<category>/<menu_name>', methods=['GET'])
def get_menu_description(category, menu_name):
    try:
        description = filter_each_menu_description(category, menu_name)
        if description:
            return jsonify(description), 200
        else:
            return jsonify({"error": "Description not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
