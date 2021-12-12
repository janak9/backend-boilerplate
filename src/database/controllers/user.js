import { User } from "../../database/index";

const find_by_id = (id, options) => {
  if (!options) {
    return User.findById(id);
  } else if (options.with_meta_data) {
    return User.findById(id)
      .populate("education")
      .populate("gender")
      .populate({
        path: "subscription_meta",
        options: { getters: true },
        populate: {
          path: "plan",
        },
      })
      .populate("settings");
  } else if (options.with_gender) {
    return User.findById(id).populate("gender");
  }
};

const find_one = (filter) => {
  if (!filter) return;
  return User.findOne(filter);
};

const find = (filter, ...rest) => {
  return User.find(filter, ...rest);
};

const create = (posted_data) => {
  if (!posted_data) return;
  return User.create(posted_data);
};

const edit = (filter, posted_data) => {
  if (!posted_data || !filter) return;

  return User.findOneAndUpdate(filter, posted_data, { new: true, runValidators: true })
    .populate("education")
    .populate("gender")
    .populate({
      path: "subscription_meta",
      populate: {
        path: "plan",
      },
    })
    .populate("settings");
};

const updateMany = (filter, posted_data) => {
  if (!posted_data || !filter) return;
  return User.updateMany(filter, posted_data, { new: true, runValidators: true });
};

const remove = (id) => {
  return User.findOneAndDelete({ _id: id }).lean();
};

const delete_many = (filter) => {
  if (!filter) return;
  return User.deleteMany(filter);
};

export default {
  find_by_id,
  find_one,
  find,
  create,
  edit,
  updateMany,
  remove,
  delete_many,
};
