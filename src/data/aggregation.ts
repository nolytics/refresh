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
            _id: '$metadata.isMobile',
            count: {
                $count: {}
            }
        }
    },
    {
        $project: {
            mobileVisitorsCount: {
                $cond: {
                    if: {
                        $eq: [
                            '$_id', true
                        ]
                    },
                    then: '$count',
                    else: '$$REMOVE'
                }
            },
            nonMobileVisitorsCount: {
                $cond: {
                    if: {
                        $eq: [
                            '$_id', false
                        ]
                    },
                    then: '$count',
                    else: '$$REMOVE'
                }
            }
        }
    },
    {
        $group: {
            _id: null,
            nonMobileVisitorsCount: {
                $push: '$nonMobileVisitorsCount'
            },
            mobileVisitorsCount: {
                $push: '$mobileVisitorsCount'
            }
        }
    },
    {
        $project: {
            mobileVisitorsCount: {
                $arrayElemAt: [
                    '$mobileVisitorsCount', 0
                ]
            },
            nonMobileVisitorsCount: {
                $arrayElemAt: [
                    '$nonMobileVisitorsCount', 0
                ]
            }
        }
    },
    {
        $project: {
            mobileVisitorsCount: '$mobileVisitorsCount',
            nonMobileVisitorsCount: '$nonMobileVisitorsCount',
            mobileVisitorsPercentage: {
                $divide: [
                    '$mobileVisitorsCount', {
                        $sum: [
                            '$mobileVisitorsCount', '$nonMobileVisitorsCount'
                        ]
                    }
                ]
            },
            nonMobileVisitorsPercentage: {
                $divide: [
                    '$nonMobileVisitorsCount', {
                        $sum: [
                            '$mobileVisitorsCount', '$nonMobileVisitorsCount'
                        ]
                    }
                ]
            }
        }
    },
    {
        $unset: '_id'
    }
];