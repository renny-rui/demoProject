# 3D Models Directory

This directory is intended for storing 3D model files used in the battle simulation.

## Supported Model Formats

- GLB/GLTF (.glb, .gltf)

## How to Add Models

1. Place your model files in this directory
2. Update the `modelPaths` array in `BattleSimulation.vue`:

```javascript
modelPaths: [
  '/models/your-model-file.glb',
  '/models/another-model.glb'
]
```

## Model Requirements

- Models should be optimized for web use (reduced polygon count, compressed textures)
- Recommended file size: under 5MB per model
- Models should have proper scaling and orientation

If no models are provided, the application will automatically create simple geometric shapes as placeholders.
