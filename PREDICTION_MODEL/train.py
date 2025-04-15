# train.py
import tensorflow as tf
from tensorflow.keras.layers import Conv2D, BatchNormalization, ReLU, GlobalAveragePooling2D
from tensorflow.keras.layers import Dense, Add, Multiply, Input, MaxPool2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau, EarlyStopping
from tensorflow.keras.optimizers import SGD
import numpy as np
import os

# Configuration
IMG_SIZE = (100, 100)  
BATCH_SIZE = 32       
EPOCHS = 80            # 80 epochs as per paper
NUM_CLASSES = 7        # 7 emotion classes
DATA_PATH = 'M:/PROJECTS/WEB_PROJECT/FINAL/dataset'  

# Squeeze-and-Excitation Block 
def se_block(input_tensor, ratio=16):
    channels = input_tensor.shape[-1]
    
    # Squeeze
    se = GlobalAveragePooling2D()(input_tensor)
    # Excitation
    se = Dense(channels//ratio, activation='relu')(se)
    se = Dense(channels, activation='sigmoid')(se)
    
    return Multiply()([input_tensor, se])

# Residual Block with SE 
def residual_block(x, filters, strides=1):
    shortcut = x
    
    # First convolution
    x = Conv2D(filters, (3,3), strides=strides, padding='same')(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    
    # Second convolution
    x = Conv2D(filters, (3,3), padding='same')(x)
    x = BatchNormalization()(x)
    
    # Add SE block
    x = se_block(x)
    
    # Shortcut connection
    if shortcut.shape[-1] != filters or strides != 1:
        shortcut = Conv2D(filters, (1,1), strides=strides)(shortcut)
        
    x = Add()([x, shortcut])
    return ReLU()(x)

# Build ResEmoteNet 
def build_resemotenet(input_shape=(100,100,3), num_classes=7):
    inputs = Input(shape=input_shape)
    
    # Initial CNN Block 
    x = Conv2D(64, (3,3), padding='same')(inputs)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    x = MaxPool2D(pool_size=(2,2))(x)
    
    x = Conv2D(128, (3,3), padding='same')(x)
    x = BatchNormalization()(x)
    x = ReLU()(x)
    x = MaxPool2D(pool_size=(2,2))(x)
    
    # Residual Blocks 
    x = residual_block(x, 256, strides=1)
    x = residual_block(x, 256, strides=1)
    x = residual_block(x, 256, strides=1)
    
    # Final Layers
    x = GlobalAveragePooling2D()(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(num_classes, activation='softmax')(x)
    
    return Model(inputs, outputs)

# Data Preparation 
train_datagen = ImageDataGenerator(
    rescale=1./255,
    horizontal_flip=True,
    validation_split=0.2  # 80-20 split as per paper
)

test_datagen = ImageDataGenerator(
    rescale=1./255
)

# Train/Validation generators
train_generator = train_datagen.flow_from_directory(
    os.path.join(DATA_PATH, 'train'),
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    #subset='training'
)

val_generator = train_datagen.flow_from_directory(
    os.path.join(DATA_PATH, 'test'), 
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    #subset='validation'
)

# Class weights calculation 
class_counts = {
    0: 705,   # Angry
    1: 717,   # Disgust
    2: 281,   # Fear
    3: 4772,  # Happy
    4: 2524,  # Neutral
    5: 1982,  # Sad
    6: 1290   # Surprise
}

total_samples = sum(class_counts.values())
class_weights = {
    k: total_samples / (len(class_counts) * v) 
    for k, v in class_counts.items()
}

# Build and compile model
model = build_resemotenet()
model.compile(
    optimizer=SGD(learning_rate=1e-3, momentum=0.9),  # Paper parameters
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Callbacks
callbacks = [
    ModelCheckpoint(
        'resemotenet.h5',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max'
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.1,      
        patience=5,       # Wait 5 epochs
        min_lr=1e-6
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True
    )
]

# Training
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator,
    callbacks=callbacks,
    class_weight=class_weights
)

print("Training completed. Best model saved as 'best_resemotenet.h5'")
