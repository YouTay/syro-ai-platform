import os
from dotenv import load_dotenv
from azure.data.tables import TableServiceClient
from azure.core.exceptions import ResourceExistsError

load_dotenv()

CONNECTION_STRING = os.getenv("AZURE_TABLE_CONNECTION_STRING")

if not CONNECTION_STRING:
    raise RuntimeError("Missing AZURE_TABLE_CONNECTION_STRING in .env")

service_client = TableServiceClient.from_connection_string(CONNECTION_STRING)


def get_table_client(table_name: str):
    try:
        service_client.create_table(table_name)
    except ResourceExistsError:
        pass

    return service_client.get_table_client(table_name)