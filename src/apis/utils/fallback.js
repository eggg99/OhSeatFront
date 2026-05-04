export const emptyPage = (param = {}) => {
    const page = Number(param.page ?? 0);
    const size = Number(param.size ?? 10);

    return {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: page,
        size,
        first: true,
        last: true,
    };
};

export const isEmptyDataError = (error) => {
    const status = error?.response?.status;
    return status === 404 || status === 204;
};

export const logApiError = (message, error) => {
    if (isEmptyDataError(error)) {
        console.info(`${message}: 데이터가 없습니다.`);
        return;
    }

    console.error(`${message}: `, error);
};
