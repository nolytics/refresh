export const hitsSummaryAggregation = [
    {
        $group: {
            _id: '$pageId',
            hitsCount: {
                $count: {}
            }
        }
    },
    {
        $sort: {
            hitsCount: -1
        }
    },
    {
        $addFields: {
            pageId: '$_id'
        }
    },
    {
        $unset: '_id'
    }
];

export const visitorsSummaryAggregation = [
    {
        $group: {
            _id: {
                anonymizedId: "$client.anonymizedId",
                isMobile: "$metadata.isMobile",
            },
            count: {
                $count: {},
            },
        },
    },
    {
        $project: {
            mobileVisitors: {
                $cond: {
                    if: {
                        $eq: ["$_id.isMobile", true],
                    },
                    then: "$count",
                    else: "$$REMOVE",
                },
            },
            nonMobileVisitors: {
                $cond: {
                    if: {
                        $eq: ["$_id.isMobile", false],
                    },
                    then: "$count",
                    else: "$$REMOVE",
                },
            },
        },
    },
    {
        $group: {
            _id: null,
            nonMobileVisitors: {
                $push: "$nonMobileVisitors",
            },
            mobileVisitors: {
                $push: "$mobileVisitors",
            },
        },
    },
    {
        $project: {
            uniqueMobileVisitorsCount: {
                $size: "$mobileVisitors",
            },
            allMobileVisitorsCount: {
                $sum: "$mobileVisitors",
            },
            uniqueNonMobileVisitorsCount: {
                $size: "$nonMobileVisitors",
            },
            allNonMobileVisitorsCount: {
                $sum: "$nonMobileVisitors",
            },
        },
    },
    {
        $project: {
            uniqueMobileVisitorsCount:
                "$uniqueMobileVisitorsCount",
            uniqueNonMobileVisitorsCount:
                "$uniqueNonMobileVisitorsCount",
            uniqueMobileVisitorsPercentage: {
                $divide: [
                    "$uniqueMobileVisitorsCount",
                    {
                        $sum: [
                            "$uniqueMobileVisitorsCount",
                            "$uniqueNonMobileVisitorsCount",
                        ],
                    },
                ],
            },
            uniqueNonMobileVisitorsPercentage: {
                $divide: [
                    "$uniqueNonMobileVisitorsCount",
                    {
                        $sum: [
                            "$uniqueNonMobileVisitorsCount",
                            "$uniqueMobileVisitorsCount",
                        ],
                    },
                ],
            },
            allMobileVisitorsCount:
                "$allMobileVisitorsCount",
            allNonMobileVisitorsCount:
                "$allNonMobileVisitorsCount",
            allMobileVisitorsPercentage: {
                $divide: [
                    "$allMobileVisitorsCount",
                    {
                        $sum: [
                            "$allMobileVisitorsCount",
                            "$allNonMobileVisitorsCount",
                        ],
                    },
                ],
            },
            allNonMobileVisitorsPercentage: {
                $divide: [
                    "$allNonMobileVisitorsCount",
                    {
                        $sum: [
                            "$allNonMobileVisitorsCount",
                            "$allMobileVisitorsCount",
                        ],
                    },
                ],
            },
        },
    },
    {
        $unset: "_id",
    },

];