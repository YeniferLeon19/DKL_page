from sqlalchemy import Column, BigInteger, String, Numeric, Boolean, Integer, ForeignKey, DateTime, text, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from database import Base

# ===========================================================================
# 1. MODELO: USUARIOS
# ===========================================================================
class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(BigInteger, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    telefono = Column(String(20))
    contraseña = Column(String(255), nullable=False)
    rol = Column(String(30), server_default="cliente")
    estado_cuenta = Column(String(30), server_default="activo")
    fecha_registro = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

    # Relaciones
    pedidos = relationship("Pedido", back_populates="usuario")


# ===========================================================================
# 2. MODELO: PRODUCTOS (Catálogo General)
# ===========================================================================
class Producto(Base):
    __tablename__ = "productos"

    id = Column(BigInteger, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    descripcion = Column(Text)  # <-- Corregido
    precio_venta = Column(Numeric(12, 2), nullable=False)
    precio_compra = Column(Numeric(12, 2))
    categoria = Column(String(100))
    marca = Column(String(100))
    imagen_url = Column(Text)  # <-- Corregido
    activo = Column(Boolean, server_default="true")
    fecha_creacion = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

    # Relaciones
    variantes = relationship("VarianteProducto", back_populates="producto", cascade="all, delete-orphan")


# ===========================================================================
# 3. MODELO: VARIANTES_PRODUCTO (Tallas Asiáticas, Medidas y Stock)
# ===========================================================================
class VarianteProducto(Base):
    __tablename__ = "variantes_producto"

    id = Column(BigInteger, primary_key=True, index=True)
    producto_id = Column(BigInteger, ForeignKey("productos.id", ondelete="CASCADE"))
    sku = Column(String(100), unique=True, nullable=False, index=True)
    talla_asiatica = Column(String(20), nullable=False)
    talla_colombia = Column(String(20))
    medidas_cm = Column(JSONB)
    color = Column(String(50))
    stock_actual = Column(Integer, nullable=False, server_default="0")
    imagen_variante = Column(Text)  # <-- Corregido
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

    # Relaciones
    producto = relationship("Producto", back_populates="variantes")
    detalles_pedido = relationship("DetallePedido", back_populates="variante")


# ===========================================================================
# 4. MODELO: PEDIDOS (Cabecera)
# ===========================================================================
class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(BigInteger, primary_key=True, index=True)
    usuario_id = Column(BigInteger, ForeignKey("usuarios.id", ondelete="SET NULL"))
    fecha_pedido = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    estado = Column(String(50), server_default="Procesando")
    total_pedido = Column(Numeric(12, 2), nullable=False)
    direccion_envio = Column(Text, nullable=False)  # <-- Corregido
    ciudad = Column(String(100), nullable=False)
    metodo_pago = Column(String(50))

    # Relaciones
    usuario = relationship("Usuario", back_populates="pedidos")
    detalles = relationship("DetallePedido", back_populates="pedido", cascade="all, delete-orphan")
    transaccion = relationship("TransaccionPago", uselist=False, back_populates="pedido")
    factura = relationship("Factura", uselist=False, back_populates="pedido")


# ===========================================================================
# 5. MODELO: DETALLES_PEDIDO
# ===========================================================================
class DetallePedido(Base):
    __tablename__ = "detalles_pedido"

    id = Column(BigInteger, primary_key=True, index=True)
    pedido_id = Column(BigInteger, ForeignKey("pedidos.id", ondelete="CASCADE"))
    variante_id = Column(BigInteger, ForeignKey("variantes_producto.id", ondelete="RESTRICT"))
    cantidad = Column(Integer, nullable=False)
    precio_unitario = Column(Numeric(12, 2), nullable=False)

    # Relaciones
    pedido = relationship("Pedido", back_populates="detalles")
    variante = relationship("VarianteProducto", back_populates="detalles_pedido")


# ===========================================================================
# 6. MODELO: TRANSACCIONES_PAGO (Pasarelas)
# ===========================================================================
class TransaccionPago(Base):
    __tablename__ = "transacciones_pago"

    id = Column(BigInteger, primary_key=True, index=True)
    pedido_id = Column(BigInteger, ForeignKey("pedidos.id", ondelete="RESTRICT"), unique=True)
    proveedor = Column(String(50), nullable=False)
    referencia_externa = Column(String(150), unique=True, nullable=False)
    monto = Column(Numeric(12, 2), nullable=False)
    estado_pago = Column(String(50), nullable=False)
    fecha_transaccion = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

    # Relaciones
    pedido = relationship("Pedido", back_populates="transaccion")


# ===========================================================================
# 7. MODELO: FACTURAS
# ===========================================================================
class Factura(Base):
    __tablename__ = "facturas"

    id = Column(BigInteger, primary_key=True, index=True)
    pedido_id = Column(BigInteger, ForeignKey("pedidos.id", ondelete="RESTRICT"), unique=True)
    numero_factura = Column(String(100), unique=True, nullable=False)
    fecha_emision = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    monto_total = Column(Numeric(12, 2), nullable=False)
    xml_pdf_url = Column(Text)  # <-- Corregido

    # Relaciones
    pedido = relationship("Pedido", back_populates="factura")