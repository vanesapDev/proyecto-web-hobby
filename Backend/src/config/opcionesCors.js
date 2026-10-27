const origenesPermitidos = (process.env.ORIGENES_PERMITIDOS ?? 'http://127.0.0.1:5500,http://localhost:5500')
  .split(',')
  .map((origen) => origen.trim());

export const opcionesCors = {
  origin: origenesPermitidos,
  methods: ['GET', 'POST']
};