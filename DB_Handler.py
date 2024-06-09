import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def filter_by_category(category):
    collections = db.collection('menu_list').document(category).collections()
    menu_names_with_img = []
    
    for collection in collections:
        img_ref = collection.document('img')
        img_doc = img_ref.get()
        
        if img_doc.exists:
            img_data = img_doc.to_dict()
            menu_names_with_img.append({
                "collection_name": collection.id,
                "img": img_data
            })
    
    return menu_names_with_img

def filter_by_options(category, greasiness, hardness, spiciness):
    collections = db.collection('menu_list').document(category).collections()
    filtered_menus = []

    for collection in collections:
        menu_name = collection.id
        description_ref = collection.document('description')
        description_doc = description_ref.get()
        
        if description_doc.exists:
            description_data = description_doc.to_dict()
            if (description_data.get('greasiness', 5) <= greasiness and
                description_data.get('hardness', 5) <= hardness and
                description_data.get('spiciness', 5) <= spiciness):
                img_ref = collection.document('img')
                img_doc = img_ref.get()
                img_data = img_doc.to_dict() if img_doc.exists else {}

                filtered_menus.append({
                    "category": category,
                    "menu_name": menu_name,
                    "description": description_data,
                    "img": img_data
                })

    return filtered_menus

def filter_each_menu_description(category, menu_name):
    menu_description_ref = db.collection('menu_list').document(category).collection(menu_name).document('description')
    menu_description = menu_description_ref.get()
    
    if menu_description.exists:
        return menu_description.to_dict()
    else:
        return None
