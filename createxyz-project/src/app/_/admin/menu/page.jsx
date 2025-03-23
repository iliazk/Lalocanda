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
    window.location.href = "/account/signin?callbackUrl=/admin/menu";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1e1d1b]">
      <header className="bg-[#1a1918] border-b border-[#f5ae15]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-[#f5ae15] text-xl font-bold">
                LA LOCANDA
              </a>
              <nav className="ml-10 space-x-4">
                <a
                  href="/admin/menu"
                  className="text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Menu Management
                </a>
                <a
                  href="/admin/reservations"
                  className="text-white hover:text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reservations
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">{user.email}</span>
              <a
                href="/account/logout"
                className="text-white hover:text-[#f5ae15] px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#f5ae15] text-3xl font-bold">
              Menu Management
            </h1>
            <button
              onClick={() => {
                setIsFormOpen(true);
                setEditingItem(null);
              }}
              className="bg-[#f5ae15] text-black px-4 py-2 rounded hover:bg-[#d89c13] transition-colors"
            >
              Add New Item
            </button>
          </div>

          <div className="mb-6 border-b border-[#f5ae15]/20">
            <div className="flex space-x-4">
              {["LOUNASBUFFET", "JUOMALISTA", "A LA CARTE"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab
                      ? "text-[#f5ae15] border-b-2 border-[#f5ae15]"
                      : "text-gray-400 hover:text-[#f5ae15]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#f5ae15] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-12">{error}</div>
          ) : (
            <div className="bg-[#2a2826] rounded-lg shadow-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1a1918]">
                    <th className="px-6 py-3 text-left text-[#f5ae15]">Name</th>
                    <th className="px-6 py-3 text-left text-[#f5ae15]">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-[#f5ae15]">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-[#f5ae15]">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-[#f5ae15]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1918]">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="text-white">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.price}€</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsFormOpen(true);
                          }}
                          className="text-[#f5ae15] hover:text-[#d89c13]"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => setDeleteModal(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-[#2a2826] rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-[#e4a00e] text-2xl mb-6">
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = Object.fromEntries(new FormData(e.target));
                  handleSubmit(formData);
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#e4a00e] mb-2">Name</label>
                    <input
                      name="name"
                      required
                      defaultValue={editingItem?.name}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      Category
                    </label>
                    <input
                      name="category"
                      required
                      defaultValue={editingItem?.category}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">Price</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editingItem?.price}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e4a00e] mb-2">
                      Menu Type
                    </label>
                    <select
                      name="menu_type"
                      required
                      defaultValue={editingItem?.menu_type || activeTab}
                      className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                    >
                      <option value="LOUNASBUFFET">LOUNASBUFFET</option>
                      <option value="JUOMALISTA">JUOMALISTA</option>
                      <option value="A LA CARTE">A LA CARTE</option>
                    </select>
                  </div>
                  {(editingItem?.menu_type === "JUOMALISTA" ||
                    (!editingItem && activeTab === "JUOMALISTA")) && (
                    <div>
                      <label className="block text-[#e4a00e] mb-2">
                        Drink Type
                      </label>
                      <select
                        name="drink_type"
                        className="w-full bg-[#1a1918] text-white px-4 py-2 rounded"
                        defaultValue={editingItem?.drink_type}
                      >
                        <option value="Wine">Wine</option>
                        <option value="Beer">Beer</option>
                        <option value="Cocktails">Cocktails</option>
                        <option value="Non-Alcoholic">Non-Alcoholic</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#e4a00e] text-black px-4 py-2 rounded hover:bg-[#c58c0c]"
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
            <div className="bg-[#2a2826] rounded-lg p-6 max-w-md w-full">
              <h2 className="text-[#e4a00e] text-2xl mb-4">Confirm Delete</h2>
              <p className="text-white mb-6">
                Are you sure you want to delete "{deleteModal.name}"?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {notification && (
          <div
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
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
    </div>
  );
}

export default MainComponent;