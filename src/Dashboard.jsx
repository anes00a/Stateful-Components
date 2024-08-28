import React, { useState } from 'react';

const initialCharacters = [
  {
    id: 1,
    name: 'SpongeBob SquarePants',
    description: 'A yellow sea sponge who lives in a pineapple under the sea.',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg',
  },
  {
    id: 2,
    name: 'Patrick Star',
    description: 'A pink starfish who is SpongeBob\'s best friend.',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/33/Patrick_Star.svg',
  },
  {
    id: 3,
    name: 'Squidward Tentacles',
    description: 'An octopus who is SpongeBob\'s neighbor and coworker.',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Squidward_Tentacles.svg',
  }
];

function Dashboard() {
  const [characters, setCharacters] = useState(initialCharacters);
  const [editing, setEditing] = useState(null);

  const handleDelete = (id) => {
    setCharacters(characters.filter(character => character.id !== id));
  };

  const handleEdit = (id) => {
    setEditing(id);
  };

  const handleSave = (id, updatedCharacter) => {
    setCharacters(characters.map(character => character.id === id ? updatedCharacter : character));
    setEditing(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>SpongeBob Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            isEditing={editing === character.id}
            onDelete={() => handleDelete(character.id)}
            onEdit={() => handleEdit(character.id)}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ character, isEditing, onDelete, onEdit, onSave }) {
  const [formData, setFormData] = useState({
    name: character.name,
    description: character.description,
    image: character.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    onSave(character.id, { ...character, ...formData });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px', textAlign: 'center' }}>
      <img src={formData.image} alt={formData.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{ width: '100%', margin: '5px 0' }}
          />
          <button onClick={handleSaveClick}>Save Changes</button>
        </div>
      ) : (
        <div>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} style={{ marginLeft: '5px' }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;