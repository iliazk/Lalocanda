"use client";
import React from "react";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("LOUNASBUFFET");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const { data: user, loading: authLoading } = useUser();

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-menu-items", {
        method: "POST",
        body: JSON.stringify({ menu_type: activeTab }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data.items || []);
    } catch (err) {
      setError("Failed to load menu items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleSubmit = async (formData) => {
    try {
      const endpoint = editingItem
        ? "/api/update-menu-item"
        : "/api/create-menu-item";
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          id: editingItem?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save menu item");
      }

      setNotification({
        type: "success",
        message: `Item ${editingItem ? "updated" : "created"} successfully`,
      });
      setIsFormOpen(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/delete-menu-item", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      setNotification({
        type: "success",
        message: "Item deleted successfully",
      });
      setDeleteModal(null);
      fetchMenuItems();
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1e1d1b] flex items-center justify-center">
        <div className="text-[#e4a00e] text-xl">
          Please sign in to access this page
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1d1b] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-[#e4a00e] text-3xl font-bold">Menu Management</h1>
          <button
            onClick={() => {
              setIsFormOpen(true);
              setEditingItem(null);
            }}
            className="w-full md:w-auto bg-[#e4a00e] text-black px-6 py-4 rounded-lg text-lg hover:bg-[#c58c0c] transition-colors"
          >
            Add New Item
          </button>
        </div>

        <div className="mb-6 border-b border-[#e4a00e]/20 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {["LOUNASBUFFET", "JUOMALISTA", "A LA CARTE"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === tab
                    ? "text-[#e4a00e] border-b-2 border-[#e4a00e]"
                    : "text-gray-400 hover:text-[#e4a00e]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-[#e4a00e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-12 text-lg">{error}</div>
        ) : (
          <div className="bg-[#2a2826] rounded-lg shadow-xl overflow-hidden">
            <div className="divide-y divide-[#1a1918]">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-grow">
                    <h3 className="text-xl text-white mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-2">{item.category}</p>
                    <p className="text-[#e4a00e] text-lg">{item.price}€</p>
                    <p className="text-gray-300 mt-2">{item.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setIsFormOpen(true);
                      }}
                      className="flex-1 md:flex-none bg-[#e4a00e] text-black px-6 py-4 rounded-lg hover:bg-[#c58c0c] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(item)}
                      className="flex-1 md:flex-none bg-red-500 text-white px-6 py-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#2a2826] rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-[#e4a00e] text-2xl mb-6">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = Object.fromEntries(new FormData(e.target));
                handleSubmit(formData);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-[#e4a00e] mb-2 text-lg">
                  Name
                </label>
                <input
                  name="name"
                  required
                  defaultValue={editingItem?.name}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg text-lg"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2 text-lg">
                  Category
                </label>
                <input
                  name="category"
                  required
                  defaultValue={editingItem?.category}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg text-lg"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2 text-lg">
                  Price (€)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  defaultValue={editingItem?.price}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg text-lg"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2 text-lg">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg text-lg min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-[#e4a00e] mb-2 text-lg">
                  Menu Type
                </label>
                <select
                  name="menu_type"
                  required
                  defaultValue={editingItem?.menu_type || activeTab}
                  className="w-full bg-[#1a1918] text-white px-4 py-3 rounded-lg text-lg"
                >
                  <option value="LOUNASBUFFET">LOUNASBUFFET</option>
                  <option value="JUOMALISTA">JUOMALISTA</option>
                  <option value="A LA CARTE">A LA CARTE</option>
                </select>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-6 py-4 text-lg text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#e4a00e] text-black px-6 py-4 rounded-lg text-lg hover:bg-[#c58c0c] transition-colors"
                >
                  {editingItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#2a2826] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-[#e4a00e] text-2xl mb-4">Confirm Delete</h2>
            <p className="text-white mb-6 text-lg">
              Are you sure you want to delete "{deleteModal.name}"?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-6 py-4 text-lg text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                className="flex-1 bg-red-500 text-white px-6 py-4 rounded-lg text-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg text-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-white/80 hover:text-white"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default MainComponent;