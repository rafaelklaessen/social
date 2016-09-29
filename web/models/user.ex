defmodule Social.User do
  use Social.Web, :model

  schema "users" do
    field :username, :string, unique: true
    field :name, :string
    field :password, :string
    field :email, :string, unique: true
    field :bio, :string
    field :location, :string
    field :website, :string
    field :birthday, :string
    field :profile_picture, :string
    field :banner, :string
    field :theme_color, :string
    field :settings, :string
    field :following, :string
    field :followers, :string
    field :likes, :string
    field :lists, :string

    timestamps()
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :name, :password, :email, :bio, :location, :website, :birthday, :profile_picture, :banner, :theme_color, :settings, :following, :followers, :likes, :lists])
    |> validate_required([:username, :name, :password, :email])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> unique_constraint(:username, name: :users_username_index)
    |> unique_constraint(:email, name: :users_email_index)
  end

end
