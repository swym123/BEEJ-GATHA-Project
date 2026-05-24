import { useState, useEffect } from "react";

const STORAGE_KEY = "beej_gatha_inventory";

interface ProductItem {
    id: number;
    category: string;
    name: string;
    code: string;
    tag: string;
    icon: string;
    img: string;
    yield: string;
    maturity: string;
    resistance: string;
    season: string;
    spacing: string;
    desc: string;
    fullDesc: string;
    badge: "green" | "blue" | "amber";
}

// Initial structure template used when generating a brand new seed record
const EMPTY_PRODUCT: Omit<ProductItem, "id"> = {
    category: "Cereal",
    name: "",
    code: "",
    tag: "New",
    icon: "🌾",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    yield: "",
    maturity: "",
    resistance: "",
    season: "Kharif & Rabi",
    spacing: "Standard spacing",
    desc: "",
    fullDesc: "",
    badge: "green",
};

export default function AdminDashboard() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [editingItem, setEditingItem] = useState<ProductItem | null>(null);

    // ✅ State tracking to manage insertion configurations
    const [newItem, setNewItem] = useState<Omit<ProductItem, "id">>(EMPTY_PRODUCT);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setProducts(JSON.parse(stored));
    }, []);

    const handleEditClick = (product: ProductItem) => {
        setIsAdding(false);
        setEditingItem({ ...product });
    };

    const handleStartAdd = () => {
        setEditingItem(null);
        setNewItem({ ...EMPTY_PRODUCT });
        setIsAdding(true);
    };

    // Handles input modifications for the EDIT form
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        setEditingItem({ ...editingItem, [name]: value });
    };

    // Handles input modifications for the INSERT form
    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // ✅ INSERT FUNCTIONALITY: Submits and creates a new seed item records
    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate an incremental safe id tracking loop based on highest current value
        const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        const createdProduct: ProductItem = { ...newItem, id: nextId };

        const updatedList = [...products, createdProduct];
        setProducts(updatedList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

        setIsAdding(false);
        setNewItem(EMPTY_PRODUCT);
        alert("New seed profile successfully injected into dynamic inventory!");
    };

    // ✅ UPDATE FUNCTIONALITY: Persists alterations over active structural components
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        const updatedList = products.map((p) => (p.id === editingItem.id ? editingItem : p));
        setProducts(updatedList);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        setEditingItem(null);
        alert("Catalog configuration successfully committed!");
    };

    // ✅ DELETE FUNCTIONALITY: Permanently filters out chosen targeted items
    const handleDeleteClick = (id: number, name: string) => {
        if (window.confirm(`Are you completely sure you want to permanently delete "${name}" from your catalog listings?`)) {
            const updatedList = products.filter((p) => p.id !== id);
            setProducts(updatedList);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

            // Close forms if the active items were wiped completely
            if (editingItem?.id === id) setEditingItem(null);
        }
    };

    return (
        <div style={{ padding: "6rem 2rem", background: "#fdfcf9", minHeight: "100vh", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2>Beej Gatha Control Dashboard</h2>
                    <p>Modify hybrid records, resistance metrics, or deploy fresh additions into inventory streams.</p>
                </div>
                {/* ✅ Trigger button to initialize item entry additions layout */}
                <button onClick={handleStartAdd} style={{ cursor: "pointer", background: "#3d6b2f", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "30px", fontWeight: "bold" }}>
                    + Add New Seed Variety
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: (editingItem || isAdding) ? "1.2fr 1fr" : "1fr", gap: "2rem", marginTop: "2rem" }}>

                {/* INVENTORY TRACKING TABLE PANEL CONTAINER */}
                <div>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #e8dcc8" }}>
                        <thead>
                            <tr style={{ background: "#3d6b2f", color: "#fff", textAlign: "left" }}>
                                <th style={{ padding: "12px" }}>Product</th>
                                <th style={{ padding: "12px" }}>SKU Code</th>
                                <th style={{ padding: "12px" }}>Category</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} style={{ borderBottom: "1px solid #e8dcc8" }}>
                                    <td style={{ padding: "12px" }}>{p.icon} {p.name}</td>
                                    <td style={{ padding: "12px" }}><code>{p.code}</code></td>
                                    <td style={{ padding: "12px" }}>{p.category}</td>
                                    <td style={{ padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}>
                                        <button onClick={() => handleEditClick(p)} style={{ cursor: "pointer", background: "#8cc63f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px" }}>Edit</button>
                                        {/* ✅ Permanent wipe operations trigger */}
                                        <button onClick={() => handleDeleteClick(p.id, p.name)} style={{ cursor: "pointer", background: "#d9534f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px" }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ FORM VIEW A: CREATING A NEW ENTRY ITEM FORM */}
                {isAdding && (
                    <form onSubmit={handleAddSubmit} style={{ background: "#fff", padding: "2rem", border: "2px dashed #3d6b2f", borderRadius: "8px" }}>
                        <h3 style={{ margin: 0, color: "#3d6b2f" }}>Deploy Fresh Seed Pipeline</h3>

                        <label style={labelStyle}>Category Class Selection</label>
                        <select name="category" value={newItem.category} onChange={handleAddInputChange} style={inputStyle}>
                            <option value="Cereal">Cereal</option>
                            <option value="Pulse">Pulse</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Oilseed">Oilseed</option>
                            <option value="Forage">Forage</option>
                        </select>

                        <label style={labelStyle}>Variety Name</label>
                        <input type="text" name="name" value={newItem.name} onChange={handleAddInputChange} style={inputStyle} required placeholder="e.g., BG Super Mustard" />

                        <label style={labelStyle}>Product Code (SKU)</label>
                        <input type="text" name="code" value={newItem.code} onChange={handleAddInputChange} style={inputStyle} required placeholder="e.g., BGM-900" />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            <div>
                                <label style={labelStyle}>Emoji Icon Component</label>
                                <input type="text" name="icon" value={newItem.icon} onChange={handleAddInputChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Color Tag Accent Type</label>
                                <select name="badge" value={newItem.badge} onChange={handleAddInputChange} style={inputStyle}>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                    <option value="amber">Amber</option>
                                </select>
                            </div>
                        </div>

                        <label style={labelStyle}>Yield Output Range Spec</label>
                        <input type="text" name="yield" value={newItem.yield} onChange={handleAddInputChange} style={inputStyle} placeholder="e.g., 20–25 q/ha" />

                        <label style={labelStyle}>Maturity Span duration limits</label>
                        <input type="text" name="maturity" value={newItem.maturity} onChange={handleAddInputChange} style={inputStyle} placeholder="e.g., 100-110 days" />

                        <label style={labelStyle}>Shield Resistances Profile</label>
                        <input type="text" name="resistance" value={newItem.resistance} onChange={handleAddInputChange} style={inputStyle} placeholder="e.g., Blight Resistance" />

                        <label style={labelStyle}>Catalog Card Preview Text (Short Description)</label>
                        <input type="text" name="desc" value={newItem.desc} onChange={handleAddInputChange} style={inputStyle} placeholder="Short overview..." />

                        <label style={labelStyle}>Deep Specification details text</label>
                        <textarea name="fullDesc" value={newItem.fullDesc} onChange={handleAddInputChange} style={{ ...inputStyle, height: "80px" }} placeholder="Complete agronomic profile description..." />

                        <div style={{ marginTop: "1.5rem" }}>
                            <button type="submit" style={{ background: "#3d6b2f", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px", fontWeight: "bold" }}>Publish Live Product</button>
                            <button type="button" onClick={() => setIsAdding(false)} style={{ background: "#ccc", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                        </div>
                    </form>
                )}

                {/* FORM VIEW B: UPDATING EXISTING RECORD MATRIX CONTROL PANEL FORM */}
                {editingItem && (
                    <form onSubmit={handleSaveEdit} style={{ background: "#fff", padding: "2rem", border: "2px solid #8cc63f", borderRadius: "8px" }}>
                        <h3 style={{ margin: 0 }}>Editing Parameters: <span style={{ color: "#3d6b2f" }}>{editingItem.name}</span></h3>

                        <label style={labelStyle}>Seed Variety Title</label>
                        <input type="text" name="name" value={editingItem.name} onChange={handleEditInputChange} style={inputStyle} required />

                        <label style={labelStyle}>Yield Metrics Benchmarks</label>
                        <input type="text" name="yield" value={editingItem.yield} onChange={handleEditInputChange} style={inputStyle} />

                        <label style={labelStyle}>Disease Immune Resistances</label>
                        <input type="text" name="resistance" value={editingItem.resistance} onChange={handleEditInputChange} style={inputStyle} />

                        <label style={labelStyle}>In-Depth Breakdown Summary (Full Description)</label>
                        <textarea name="fullDesc" value={editingItem.fullDesc} onChange={handleEditInputChange} style={{ ...inputStyle, height: "120px" }} />

                        <div style={{ marginTop: "1.5rem" }}>
                            <button type="submit" style={{ background: "#3d6b2f", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px", fontWeight: "bold" }}>Save Changes</button>
                            <button type="button" onClick={() => setEditingItem(null)} style={{ background: "#ccc", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// Inline Utility Object style setups definitions helper definitions
const labelStyle = { display: "block", marginTop: "12px", fontSize: "0.85rem", fontWeight: "bold", color: "#5a4f3e" };
const inputStyle = { width: "100%", padding: "8px", marginTop: "4px", border: "1px solid #e8dcc8", borderRadius: "4px", boxSizing: "border-box" as const, fontFamily: "inherit" };