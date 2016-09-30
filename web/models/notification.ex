defmodule Social.Notification do
  use Social.Web, :model

  schema "notifications" do
    field :type, :string
    field :targets, :string
    field :user, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:type, :targets, :user])
    |> validate_required([:type, :targets, :user])
  end
end
