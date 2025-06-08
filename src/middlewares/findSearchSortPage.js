"use strict"

module.exports = (req, res, next) => {    

    // SEARCHING
    const search = req.query?.search || {};
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' };

    // SORTING
    const sort = { ...req.query?.sort } || {};

    // PAGINATION
    const MAX_LIMIT = 100;
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? (limit > MAX_LIMIT ? MAX_LIMIT : limit) : Number(process.env?.PAGE_SIZE || 20);

    let page = Number(req.query?.page);
    page = (page > 0 ? page : 1) - 1;

    let skip = Number(req.query?.skip);
    skip = skip > 0 ? skip : (page * limit);

    // RUN:
    req.getModelList = async (Model, populate = null) => {
        return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate);
    }

    // Details:
    req.getModelListDetails = async (Model) => {
        const totalRecords = await Model.countDocuments(search);
        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: (page + 2 <= Math.ceil(totalRecords / limit) ? page + 2 : false),
                total: Math.ceil(totalRecords / limit)
            },
            totalRecords,
        }
        if (totalRecords <= limit) details.pages = false;
        return details;
    }

    next();
}