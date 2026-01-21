import { ExcepcionesDataSourceImpl } from '../excepciones-datasource-impl';
import { excepcionesQueries } from '../../db/excepciones-queries';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({ pgPool: { query: jest.fn() } }));

describe('ExcepcionesDataSourceImpl', () => {
	let dataSource: ExcepcionesDataSourceImpl;

	beforeEach(() => {
		jest.clearAllMocks();
		dataSource = new ExcepcionesDataSourceImpl();
	});

	describe('getExcepciones', () => {
		it('debe retornar excepciones (flujo exitoso)', async () => {
			const rows = [{ id_excepcion: 1, error: 'E1', mensaje: 'msg' }];
			(pgPool.query as jest.Mock).mockResolvedValue({ rows });

			const result = await dataSource.getExcepciones();

			expect(result).toEqual(rows);
			expect(pgPool.query).toHaveBeenCalledWith(
				excepcionesQueries.getExcepciones,
			);
		});

		it('debe retornar mensaje homologado si la consulta falla', async () => {
			(pgPool.query as jest.Mock)
				.mockRejectedValueOnce(new Error('fail'))
				.mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });

			const result = await dataSource.getExcepciones();

			expect(result).toEqual({
				exitoso: 'N',
				mensaje: 'Error al obtener excepciones: Error homologado',
			});
		});
	});

	describe('UpdateExcepciones', () => {
		it('debe insertar nuevas excepciones', async () => {
			(pgPool.query as jest.Mock).mockResolvedValue({});
			const excepciones = {
				nuevos: [
					{
						id_excepcion: 1,
						error: 'E1',
						mensaje: 'msg',
						id_creado_por: 'a',
						fecha_creacion: 'f',
						fecha_modificacion: 'fm',
					},
				],
				modificados: [],
				eliminados: [],
			};

			const result = await dataSource.UpdateExcepciones(excepciones);

			expect(pgPool.query).toHaveBeenCalledWith(
				excepcionesQueries.createExcepcion,
				[1, 'E1', 'msg', 'a', 'f', 'fm'],
			);
			expect(result).toEqual({ exitoso: 'S', mensaje: expect.any(String) });
		});

		it('debe modificar excepciones', async () => {
			(pgPool.query as jest.Mock).mockResolvedValue({});
			const excepciones = {
				nuevos: [],
				modificados: [
					{
						id_excepcion: 2,
						error: 'E2',
						mensaje: 'msg2',
						fecha_modificacion: 'fm2',
					},
				],
				eliminados: [],
			};

			const result = await dataSource.UpdateExcepciones(excepciones);

			expect(pgPool.query).toHaveBeenCalledWith(
				excepcionesQueries.updateExcepciones,
				[2, 'E2', 'msg2', 'fm2'],
			);
			expect(result).toEqual({ exitoso: 'S', mensaje: expect.any(String) });
		});

		it('debe eliminar excepciones', async () => {
			(pgPool.query as jest.Mock).mockResolvedValue({});
			const excepciones = {
				nuevos: [],
				modificados: [],
				eliminados: [{ id_excepcion: 3 }],
			};

			const result = await dataSource.UpdateExcepciones(excepciones);

			expect(pgPool.query).toHaveBeenCalledWith(
				excepcionesQueries.deleteExcepciones,
				[3],
			);
			expect(result).toEqual({ exitoso: 'S', mensaje: expect.any(String) });
		});

		it('debe retornar mensaje homologado si falla la actualización', async () => {
			(pgPool.query as jest.Mock)
				.mockRejectedValueOnce(new Error('fail update'))
				.mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });
			const excepciones = {
				nuevos: [
					{
						id_excepcion: 1,
						error: 'E1',
						mensaje: 'msg',
						id_creado_por: 'a',
						fecha_creacion: 'f',
						fecha_modificacion: 'fm',
					},
				],
				modificados: [],
				eliminados: [],
			};

			const result = await dataSource.UpdateExcepciones(excepciones);

			expect(result).toEqual({
				exitoso: 'N',
				mensaje: 'Error al actualizar excepciones: Error homologado',
			});
		});
	});

	it('debe retornar error con mensaje serializado si error no es instancia de Error', async () => {
		(pgPool.query as jest.Mock).mockImplementation(() => {
			throw 'fail string';
		});

		const result = await dataSource.getExcepciones();

		expect(result).toEqual({
			exitoso: 'N',
			mensaje: 'Error al obtener excepciones: fail string',
		});
	});

	it('debe retornar error serializado si update lanza un string', async () => {
		(pgPool.query as jest.Mock).mockImplementation(() => {
			throw 'fail string';
		});
		const excepciones = {
			nuevos: [
				{
					id_excepcion: 1,
					error: 'E1',
					mensaje: 'msg',
					id_creado_por: 'a',
					fecha_creacion: 'f',
					fecha_modificacion: 'fm',
				},
			],
			modificados: [],
			eliminados: [],
		};

		const result = await dataSource.UpdateExcepciones(excepciones);

		expect(result).toEqual({
			exitoso: 'N',
			mensaje: 'Error al actualizar excepciones: fail string',
		});
	});
});
